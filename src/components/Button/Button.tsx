import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "delete";
  size?: "regular" | "default" | "auto";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "default", children, ...rest } = props;

  const variantClass = variant === "primary" ? styles.primaryButton : variant === "secondary"? styles.secondaryButton : styles.deleteButton;
  const sizeClass =
    size === "default" ? styles.defaultSize : size === "regular" ? styles.regularSize : styles.autoSize;

  return (
    <button className={`${styles.commonButton} ${variantClass} ${sizeClass}`} {...rest}>
      {children}
    </button>
  );
}
