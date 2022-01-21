import React, {
  Children,
  createContext,
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type {
  PopupActionType,
  PopupContainerContextType,
  PopupContainerProps,
} from './typing';

function getChildKey(child: any, index: number) {
  if (child?.key) {
    return child?.key;
  } else if (child?.type) {
    return child.type?.name || child?.type;
  } else {
    return index;
  }
}

export const PopupContainerContext = createContext<PopupContainerContextType>(
  {},
);

const PopupItem = forwardRef<PopupActionType, PopupContainerProps>(
  (props, ref) => {
    const { children, onFinished } = props;

    const handleClose = () => {
      setValues((prevState) => ({ ...prevState, visible: false }));
    };

    const [values, setValues] = useState<PopupContainerContextType>({
      visible: false,
      onClose: handleClose,
    });

    useImperativeHandle(ref, () => {
      return {
        trigger: (key, opts) => {
          setValues((prevState) => {
            const temp = { ...prevState, visible: true, params: opts?.params };
            if (!temp.onFinished) {
              temp.onFinished = (resp?: any) => {
                opts?.onFinished?.(resp);
                if (!opts?.stopParentFinished) {
                  onFinished?.(key, resp);
                }
              };
            }
            return temp;
          });
        },
      };
    });

    return (
      <PopupContainerContext.Provider value={values}>
        {children}
      </PopupContainerContext.Provider>
    );
  },
);

const PopupContainer = forwardRef<PopupActionType, PopupContainerProps>(
  (props, ref) => {
    const { onFinished, children } = props;

    const childRefs = useRef<any>({});

    useImperativeHandle(ref, () => ({
      trigger: (key, opts) => {
        childRefs.current[key].trigger(key, opts);
      },
    }));

    return (
      <Fragment>
        {Children.map(children, (child, index) => {
          const key = getChildKey(child, index);
          return (
            <PopupItem
              key={key}
              ref={(ref) => {
                if (ref) childRefs.current[key] = ref;
              }}
              onFinished={onFinished}
            >
              {child}
            </PopupItem>
          );
        })}
      </Fragment>
    );
  },
);

export default PopupContainer;
