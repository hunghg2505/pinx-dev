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
          appendTo: props.editor.contentComponent.editorContentRef.current,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          offset: () => {
            if (props.editor.options.element.getBoundingClientRect().y - window.scrollY - 300 > 0) {
              return [200, 0];
            }
            // [x,y]
            return [200, -(component.element.firstChild.offsetHeight + 17)];
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
        component?.destroy();
      },
    };
  },
};
