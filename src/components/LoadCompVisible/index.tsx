/* eslint-disable unicorn/no-object-as-default-parameter */
// @ts-nocheck
import dynamic from 'next/dynamic';

import withHydrationOnDemand from './lazy-hydrate';

type IEvent = 'delay' | 'visible' | 'idle' | keyof HTMLElementEventMap;
type IEventOption = IEvent | [IEvent, any];
type IWrapperProps = Record<string, any> | JSX.IntrinsicElements['section'];

interface IHydrateOption {
  on?: IEventOption[];
  onBefore?: () => Promise<any>;
  whenInputPending?: boolean;
  isInputPendingFallbackValue?: boolean;
  disableFallback?: boolean;
  wrapperProps?: IWrapperProps;
  compatibleMode?: boolean;
}

interface ILazyOption extends IHydrateOption {
  loading?: (any) => JSX.Element | null;
}

type ILazyComponent<T> = LoaderComponent<T>;
type IExtendedProps<T> = {
  wrapperProps?: IWrapperProps;
  forceHydration?: boolean;
} & T;
type ILazyComponentExtended<T> = ILazyComponent<IExtendedProps<T>>;

const EmptyComp = () => null;

export function lazyLoadComponent<T>(
  module: ILazyComponent<T>,
  option: ILazyOption = {
    on: ['visible'],
    loading: EmptyComp,
  },
): React.ComponentType<ILazyComponentExtended<T>> {
  return withHydrationOnDemand({
    on: option.on,
    onBefore: module, // Make sure we load component before hydrating it
    compatibleMode: option.compatibleMode,
    wrapperProps: {
      ...option.wrapperProps,
    },
  })(
    dynamic(module, {
      loading: option.loading || EmptyComp,
      ssr: true,
    }),
  );
}
