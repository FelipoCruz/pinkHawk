import './button.scss';

export const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({
  type,
  text,
  isLoading = false,
  ...otherProps
}: {
  type?: string;
  text?: string;
  isLoading?: boolean;
}) => {
  return (
    <button {...otherProps} className={'btn ' + type}>
      {isLoading ? <div className="btn-spinner spinner" /> : text}
    </button>
  );
};

export default Button;
