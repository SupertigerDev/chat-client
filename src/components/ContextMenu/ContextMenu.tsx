import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { classNames, conditionalClass } from '../../common/classNames';
import { Icon } from '../Icon/Icon';
import styles from './ContextMenu.module.scss';


interface Item {
  label?: string;
  icon?: string;
  onClick?: () => void;
  separator?: boolean;
  alert?: boolean
  disabled?: boolean
}

export interface ContextMenuProps {
  items: Item[]
  onClose?: () => void,
  triggerClassName?: string,
  position?: {
    x: number;
    y: number;
  }
}

export default function ContextMenu(props: ContextMenuProps) {
  const contextMenuElement = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number, left: number } | undefined>();


  const handleOutsideClick = useCallback((e: any) => {
    if (props.triggerClassName) {
      if (e.target.closest("." + props.triggerClassName)) {return};
    }
    props.onClose?.()
  }, []);
  
  const handleOutsideRightClick = useCallback((e: any) => {
    if (e.target.closest("."+styles.contextMenu)) {
      e.preventDefault();
      return;
    };
    props.onClose?.()
  }, []);

  useEffect(() => {
    if (!props.position) return;
    window.addEventListener('contextmenu', handleOutsideRightClick, {capture: true});
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('contextmenu', handleOutsideRightClick);
      window.removeEventListener('click', handleOutsideClick);
    }
  }, [props.position])


  useEffect(() => {
    setPosition(undefined);
    if (!props.position) return;
    const { x, y } = props.position;
    const contextMenu = contextMenuElement.current;
    if (!contextMenu) return;
    
    const _position ={top: y, left: x };
    // move the context menu to the left if it's off the screen.
    if (x + contextMenu.clientWidth > window.innerWidth) {
      _position.left = x - contextMenu.clientWidth;
    }
    
    // move the context menu to the top if it's off the screen.
    if (y + contextMenu.clientHeight > window.innerHeight) {
      _position.top = y - contextMenu.clientHeight;
    }
    setPosition(_position);

  }, [props.position, contextMenuElement]);
 
  if (!props.position) {
    return null;
  }

  return (
    <div ref={contextMenuElement} className={styles.contextMenu} style={position} key={position?.left! + position?.top!} >
      <div className={styles.contextMenuInner}>
        {props.items.map((item, index) => (
          <Fragment key={index}>
            {item.separator && <div className={styles.separator} />}
            {!item.separator && <Item item={item} />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function Item(props: {item: Item}) {
  return (
    <div className={classNames(styles.item, conditionalClass(props.item.alert, styles.alert), conditionalClass(props.item.disabled, styles.disabled))} onClick={props.item.onClick}>
      <Icon name={props.item.icon!} size={18} color={props.item.alert ? 'var(--alert-color)' : undefined}  />
      <span className={styles.label} >{props.item.label}</span>
    </div>
  )
}