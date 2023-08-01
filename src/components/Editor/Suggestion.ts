import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';

import MentionList from './MentionList';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });
        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          // placement: 'bottom-start',
          offset: () => {
            if (props.editor.options.element.getBoundingClientRect().y - window.scrollY - 300 > 0) {
              return [50, -50];
            }
            // [x,y]
            return [-0, -(component.element.firstChild.offsetHeight + 80)];
          },
        });
      },

      onUpdate(props: any) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide();

          return true;
        }

        return component?.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.[0]?.destroy();
        component.destroy();
      },
    };
  },
};
