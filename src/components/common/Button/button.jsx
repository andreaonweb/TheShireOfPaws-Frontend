import styles from './button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  className,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    props.disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
