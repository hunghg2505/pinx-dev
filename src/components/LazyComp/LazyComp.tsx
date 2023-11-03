/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/consistent-function-scoping */
// @ts-nocheck
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import dynamic from 'next/dynamic';

function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

const isClientSide = canUseDom();

const eventListenerOptions = {
  once: true,
  capture: true,
  passive: true,
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withHydrationOnDemandServerSide =
  (WrappedComponent) =>
  ({ wrapperProps, ...props }: any) =>
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
  }) =>
  (WrappedComponent) => {
    const WithHydrationOnDemand = ({ forceHydration = false, wrapperProps, ...props }: any) => {
      const rootRef = useRef(null);
      const cleanupFunctions = useRef([]);

      const isInputPending = () => {
        const isInputPending = navigator?.scheduling?.isInputPending?.();
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

        if (onBefore) {
          await onBefore();
        }

        setIsHydrated(true);
      };

      // @ts-ignore
      const initDOMEvent = (type, getTarget = () => rootRef.current) => {
        const target = window;
        target.addEventListener(type, hydrate, eventListenerOptions);
        cleanupFunctions.current.push(() => {
          if (!target) {
            return;
          }
          target.removeEventListener(type, hydrate, eventListenerOptions);
        });
      };

      const initTimeout = (delay = 3000) => {
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
          hydrate();
          return;
        }

        const options = getOptions();
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting || !(entry.intersectionRatio > 0)) {
            return;
          }

          hydrate();
        }, options);

        cleanupFunctions.current.push(() => {
          if (!observer) {
            return;
          }
          observer.disconnect();
        });

        observer.observe(rootRef.current);
      };

      const initEvent = (type, options) => {
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
          hydrate();
        }
        // const wasRenderedServerSide = !!rootRef.current.dataset.hydrationOnDemand;
        // const shouldHydrate = !wasRenderedServerSide && !disableFallback;

        // if (shouldHydrate) {
        //   hydrate();
        // }
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

      return (
        <section {...wrapperProps}>
          <WrappedComponent {...props} />
        </section>
      );
    };

    WithHydrationOnDemand.displayName = `withHydrationOnDemand(${getDisplayName(
      WrappedComponent,
    )})`;

    return WithHydrationOnDemand;
  };
const withHydrationOnDemand = (options = {}) => {
  if (isClientSide) {
    return withHydrationOnDemandClientSide(options);
  }

  return withHydrationOnDemandServerSide;
};

export default function lazyLoadHydrate(module, ssr = false, loading = () => <i></i>) {
  return withHydrationOnDemand({
    on: ['visible'],
    onBefore: module, // Make sure we load component before hydrating it
    forceHydration: ssr,
  })(dynamic(module, { loading, ssr }));
}

export function lazyLoadHydrateScroll(module, ssr = false, loading = () => <i></i>) {
  return withHydrationOnDemand({
    on: ['scroll'],
    onBefore: module, // Make sure we load component before hydrating it
    forceHydration: ssr,
  })(dynamic(module, { loading, ssr }));
}
