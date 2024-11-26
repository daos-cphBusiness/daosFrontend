import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "default" | "auto";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "default", children, ...rest } = props;

  const variantClass = variant === "primary" ? styles.primaryButton : styles.secondaryButton;
  const sizeClass = size === "default" ? styles.defaultSize : styles.autoSize;

  return (
    <button className={`${styles.commonButton} ${variantClass} ${sizeClass}`} {...rest}>
      {children}
    </button>
  );
}
