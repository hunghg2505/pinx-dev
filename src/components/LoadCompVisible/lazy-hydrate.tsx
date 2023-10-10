/* eslint-disable no-void */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable react/prop-types */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// @ts-ignore
import ReactDOM from 'react-dom';

const isClientSide = typeof window !== 'undefined';

declare const navigator: any; // Fix experiment property

const eventListenerOptions = {
  once: true,
  capture: true,
  passive: true,
};

const getDisplayName = (WrappedComponent: React.ComponentType) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withHydrationOnDemandServerSide =
  ({ wrapperProps }: IHydrateOption) =>
  (WrappedComponent: any) =>
  ({ ...props }) =>
    (
      <section data-hydration-on-demand={true} {...wrapperProps}>
        <WrappedComponent {...props} />
      </section>
    );

const withHydrationOnDemandClientSide =
  ({
    disableFallback = false,
    isInputPendingFallbackValue = true,
    on = [],
    onBefore,
    whenInputPending = false,
    wrapperProps,
    compatibleMode,
  }: IHydrateOption) =>
  (WrappedComponent: any) => {
    const WithHydrationOnDemand = ({ forceHydration = false, ...props }) => {
      const rootRef = useRef<HTMLElement>(null);
      const cleanupFunctions = useRef<AnyFunction[]>([]);

      const isInputPending = () => {
        const isInputPending = navigator?.scheduling?.isInputPending?.();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return isInputPending ?? isInputPendingFallbackValue;
      };

      const getDefaultHydrationState = () => {
        const isNotInputPending = whenInputPending && !isInputPending();
        return (isNotInputPending || forceHydration) && !onBefore;
      };

      const [isHydrated, setIsHydrated] = useState(getDefaultHydrationState());

      const cleanUp = () => {
        for (const fn of cleanupFunctions.current) {
          fn();
        }
        cleanupFunctions.current = [];
      };

      const hydrate = async () => {
        cleanUp();
        if (isHydrated) {
          return;
        }

        let result = null;
        if (onBefore) {
          result = (await onBefore()).default;
        }
        setIsHydrated(true);
        const el = rootRef.current;
        if (!compatibleMode && result && el) {
          const action = el.hasChildNodes() ? 'hydrate' : 'render';
          ReactDOM[action](React.createElement(result, props), el);
        }
      };

      const initDOMEvent = (type: keyof HTMLElementEventMap, getTarget = () => rootRef.current) => {
        const target = getTarget();
        target?.addEventListener(type, hydrate, eventListenerOptions);
        cleanupFunctions.current.push(() => {
          if (!target) {
            return;
          }
          target.removeEventListener(type, hydrate, eventListenerOptions);
        });
      };

      const initTimeout = (delay = 2000) => {
        if (delay <= 0) {
          return;
        }

        const timeout = setTimeout(hydrate, delay);
        cleanupFunctions.current.push(() => clearTimeout(timeout));
      };

      const initIdleCallback = () => {
        if (!('requestIdleCallback' in window)) {
          initTimeout();
          return;
        }

        const idleCallback = requestIdleCallback(() => requestAnimationFrame(() => hydrate()), {
          timeout: 500,
        });

        if (!('cancelIdleCallback' in window)) {
          return;
        }

        cleanupFunctions.current.push(() => {
          cancelIdleCallback(idleCallback);
        });
      };

      const initIntersectionObserver = (getOptions = Function.prototype) => {
        if (!('IntersectionObserver' in window)) {
          void hydrate();
          return;
        }

        if (!rootRef.current) {
          void hydrate();
          return;
        }

        const options = getOptions();
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting || !(entry.intersectionRatio > 0)) {
            return;
          }

          void hydrate();
        }, options);

        cleanupFunctions.current.push(() => {
          if (!observer) {
            return;
          }
          observer.disconnect();
        });

        observer.observe(rootRef.current);
      };

      const initEvent = (type: IEvent, options?: any) => {
        switch (type) {
          case 'delay': {
            initTimeout(options);
            break;
          }
          case 'visible': {
            initIntersectionObserver(options);
            break;
          }
          case 'idle': {
            initIdleCallback();
            break;
          }
          default: {
            initDOMEvent(type, options);
          }
        }
      };

      useLayoutEffect(() => {
        if (isHydrated) {
          return;
        }

        if (forceHydration) {
          void hydrate();
          return;
        }

        const wasRenderedServerSide = !!rootRef.current?.getAttribute('data-hydration-on-demand');
        const shouldHydrate = !wasRenderedServerSide && !disableFallback;

        if (shouldHydrate) {
          void hydrate();
        }
      }, [forceHydration]);

      useEffect(() => {
        if (isHydrated) {
          return;
        }

        for (const event of on) {
          Array.isArray(event) ? initEvent(...event) : initEvent(event);
        }
        return cleanUp;
      }, []);

      if (!isHydrated) {
        return (
          <section
            ref={rootRef}
            dangerouslySetInnerHTML={{ __html: '' }}
            suppressHydrationWarning
            {...wrapperProps}
          />
        );
      }

      if (isHydrated && compatibleMode) {
        return (
          <section {...wrapperProps}>
            <WrappedComponent {...props} />
          </section>
        );
      }

      return (
        <section
          ref={rootRef}
          dangerouslySetInnerHTML={{ __html: '' }}
          suppressHydrationWarning
          {...wrapperProps}
        />
      );
    };

    WithHydrationOnDemand.displayName = `withHydrationOnDemand(${getDisplayName(
      WrappedComponent,
    )})`;

    return WithHydrationOnDemand;
  };

const withHydrationOnDemand = (options: IHydrateOption = {}) => {
  if (isClientSide) {
    return withHydrationOnDemandClientSide(options);
  }

  return withHydrationOnDemandServerSide(options);
};

export default withHydrationOnDemand;
