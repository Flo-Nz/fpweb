import PropTypes from "prop-types";

export const CareIcon = ({ size, height, width, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.279 8.833 12 9.112l-.279-.279a2.745 2.745 0 0 0-3.906 0 2.745 2.745 0 0 0 0 3.907L12 16.926l4.186-4.186a2.745 2.745 0 0 0 0-3.907 2.746 2.746 0 0 0-3.907 0z"></path>
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
  </svg>
);

CareIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const ThemedMassagesIcon = ({ fill, size, height, width, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.726 13.02 14 16H9v-1h4.065a.5.5 0 0 0 .416-.777l-.888-1.332A1.995 1.995 0 0 0 10.93 12H3a1 1 0 0 0-1 1v6a2 2 0 0 0 2 2h9.639a3 3 0 0 0 2.258-1.024L22 13l-1.452-.484a2.998 2.998 0 0 0-2.822.504zm1.532-5.63c.451-.465.73-1.108.73-1.818s-.279-1.353-.73-1.818A2.447 2.447 0 0 0 17.494 3S16.25 2.997 15 4.286C13.75 2.997 12.506 3 12.506 3a2.45 2.45 0 0 0-1.764.753c-.451.466-.73 1.108-.73 1.818s.279 1.354.73 1.818L15 12l4.258-4.61z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

ThemedMassagesIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string.isRequired,
};

export const SomatoIcon = ({ fill, size, height, width, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.279 8.833 12 9.112l-.279-.279a2.745 2.745 0 0 0-3.906 0 2.745 2.745 0 0 0 0 3.907L12 16.926l4.186-4.186a2.745 2.745 0 0 0 0-3.907 2.746 2.746 0 0 0-3.907 0z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={0.5}
      strokeWidth={1.5}
    />
  </svg>
);

SomatoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string.isRequired,
};

export const ChevronDown = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

ChevronDown.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string.isRequired,
};

export const PlusIcon = ({ size, height, width, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill }}
    >
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
    </svg>
  );
};

export const FacebookIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.3}
    />
  </svg>
);

export const InstagramIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.3}
    ></path>
    <circle cx="11.994" cy="11.979" r="3.003"></circle>
  </svg>
);

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
></svg>;

export const YoutubeIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.3}
    ></path>
  </svg>
);

export const DiscordIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill={"currentColor"}
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
  </svg>
);

export const DiscordOutlineIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.3}
    ></path>
  </svg>
);

export const MassagesIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill }}
    {...props}
  >
    <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z"></path>
    <path d="M15 7h3v2h-3zm0 4h3v2h-3z"></path>
  </svg>
);

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const CheckIcon = ({ size, height, width, fill, ...props }) => (
  <svg
    fill="currentColor"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.1"
    ></path>
    <path
      d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.2"
    ></path>
  </svg>
);

export const CartIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height="1.5em"
    role="presentation"
    viewBox="0 0 24 24"
    width={props.size || "2em"}
    {...props}
  >
    <path
      d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
    ></path>
    <circle
      cx="10.5"
      cy="19.5"
      r="1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
    ></circle>
    <circle
      cx="17.5"
      cy="19.5"
      r="1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
    ></circle>
  </svg>
);

export const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={props.size || "2em"}
    height={props.size || "2em"}
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

export const DbIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={props.size || "64"}
    height={props.size || "64"}
    viewBox="0 0 64 64"
  >
    <path
      fill="#dadcec"
      d="M40.78 41.46H46.32V45.46H40.78z"
      transform="rotate(-45 43.543 43.464)"
    ></path>
    <rect
      width="8.49"
      height="22.51"
      x="48.8"
      y="41.79"
      fill="#cda1a7"
      rx="4"
      ry="4"
      transform="rotate(-45 53.04 53.04)"
    ></rect>
    <rect
      width="4.24"
      height="22.51"
      x="49.42"
      y="43.29"
      fill="#c4939c"
      rx="2.12"
      ry="2.12"
      transform="rotate(-45 51.542 54.54)"
    ></rect>
    <path fill="#ffeb9b" d="M25 1A24 24 0 1 0 25 49A24 24 0 1 0 25 1Z"></path>
    <path
      fill="#f6d397"
      d="M11.14,38.86,38.86,11.14a4,4,0,0,1,6.11.54A24,24,0,0,1,11.68,45,4,4,0,0,1,11.14,38.86Z"
    ></path>
    <path fill="#bbdef9" d="M25 7A18 18 0 1 0 25 43A18 18 0 1 0 25 7Z"></path>
    <path fill="#d2edff" d="M25 18A7 7 0 1 0 25 32A7 7 0 1 0 25 18Z"></path>
    <path
      fill="#f3f3f3"
      d="M21 17A4 4 0 1 0 21 25 4 4 0 1 0 21 17zM29.5 28A1.5 1.5 0 1 0 29.5 31 1.5 1.5 0 1 0 29.5 28z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M38.44,11.57a19,19,0,1,0,0,26.87A18.88,18.88,0,0,0,38.44,11.57ZM37,37a17,17,0,1,1,0-24A16.89,16.89,0,0,1,37,37Z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M31.2 14.72a12 12 0 0 1 2.28 1.79A1 1 0 1 0 34.9 15.1 14.08 14.08 0 0 0 32.23 13a1 1 0 0 0-1 1.71zM26.38 11.07a14 14 0 0 0-11.27 4 1 1 0 1 0 1.41 1.41 12 12 0 0 1 9.67-3.46 1 1 0 1 0 .2-2z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M61.88,54.46,51.54,44.12a5,5,0,0,0-3.6-1.45c0-.14-2.77-2.91-2.77-2.91a25,25,0,1,0-5.41,5.41s2.78,2.72,2.91,2.77,0,0,0,.07a5,5,0,0,0,1.46,3.54L54.46,61.88a5,5,0,0,0,7.07,0l.34-.34a5,5,0,0,0,0-7.07ZM2,25A23,23,0,1,1,25,48,23,23,0,0,1,2,25ZM44.12,44.46a5,5,0,0,0-.92,1.32l-1.87-1.87a25.2,25.2,0,0,0,2.59-2.59l1.88,1.88a5,5,0,0,0-1.32.92ZM60.46,60.12l-.34.34a3,3,0,0,1-4.24,0L45.54,50.12a3,3,0,0,1,0-4.24l.34-.34a3,3,0,0,1,4.24,0L60.46,55.88a3,3,0,0,1,0,4.24Z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M34.19 32.78a1 1 0 0 0-1.41 1.41l1.41 1.41a1 1 0 0 0 1.41-1.41zM15.81 32.78l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zM39 24H37a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM14 25a1 1 0 0 0-1-1H11a1 1 0 0 0 0 2h2A1 1 0 0 0 14 25zM25 36a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V37A1 1 0 0 0 25 36zM38.28 29.55l-1.84-.78a1 1 0 1 0-.78 1.84l1.84.78a1 1 0 1 0 .78-1.84zM20.7 35.13a1 1 0 0 0-1.31.53l-.78 1.84a1 1 0 1 0 1.84.78l.78-1.84A1 1 0 0 0 20.7 35.13zM14.8 29.12a1 1 0 0 0-1.3-.55l-1.85.75a1 1 0 1 0 .75 1.85l1.85-.75A1 1 0 0 0 14.8 29.12zM30.42 35.75a1 1 0 0 0-1.85.75l.75 1.85a1 1 0 0 0 1.85-.75z"
    ></path>
  </svg>
);

export const MyRatingsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={props.size || "64"}
    height={props.size || "64"}
    viewBox="0 0 64 64"
  >
    <rect
      width="16"
      height="50"
      x="6.75"
      y="6.77"
      fill="#f9e3ae"
      rx="2"
      ry="2"
      transform="rotate(15 14.668 31.645)"
    ></rect>
    <path
      fill="#faefde"
      d="M15.52,7.52h10a3,3,0,0,1,3,3v1a0,0,0,0,1,0,0h-16a0,0,0,0,1,0,0v-1a3,3,0,0,1,3-3Z"
      transform="rotate(15 20.438 9.462)"
    ></path>
    <rect
      width="16"
      height="50"
      x="29"
      y="7"
      fill="#85cbf8"
      rx="2"
      ry="2"
    ></rect>
    <rect
      width="16"
      height="50"
      x="45"
      y="7"
      fill="#ed7899"
      rx="2"
      ry="2"
    ></rect>
    <path
      fill="#f283a5"
      d="M48,7H58a3,3,0,0,1,3,3v1a0,0,0,0,1,0,0H45a0,0,0,0,1,0,0V10A3,3,0,0,1,48,7Z"
    ></path>
    <path
      fill="#9fddff"
      d="M32,7H42a3,3,0,0,1,3,3v1a0,0,0,0,1,0,0H29a0,0,0,0,1,0,0V10A3,3,0,0,1,32,7Z"
    ></path>
    <path fill="#7bbeeb" d="M37 43A3 3 0 1 0 37 49A3 3 0 1 0 37 43Z"></path>
    <path fill="#e0678f" d="M53 43A3 3 0 1 0 53 49A3 3 0 1 0 53 43Z"></path>
    <path
      fill="#f6d397"
      d="M11.13 42.29A3 3 0 1 0 11.13 48.29A3 3 0 1 0 11.13 42.29Z"
      transform="rotate(-75 11.13 45.292)"
    ></path>
    <path
      fill="#8d6c9f"
      d="M59,6H47a3,3,0,0,0-2,.78A3,3,0,0,0,43,6H31a3,3,0,0,0-3,2.55,3,3,0,0,0-.77-.34L15.68,5.1A3,3,0,0,0,12,7.22L.1,51.66a3,3,0,0,0,2.12,3.67l11.59,3.11a3,3,0,0,0,2.28-.3,3,3,0,0,0,1.4-1.82L28,17.09V55a3,3,0,0,0,3,3H43a3,3,0,0,0,2-.78A3,3,0,0,0,47,58H59a3,3,0,0,0,3-3V9A3,3,0,0,0,59,6ZM27.46,11.37,15.56,55.8a1,1,0,0,1-1.22.71L2.74,53.4A1,1,0,0,1,2,52.17L13.94,7.74a1,1,0,0,1,1-.74,1,1,0,0,1,.26,0l11.59,3.11a1,1,0,0,1,.71,1.23ZM43,56H31a1,1,0,0,1-1-1V9a1,1,0,0,1,1-1H43a1,1,0,0,1,1,1V55A1,1,0,0,1,43,56Zm17-1a1,1,0,0,1-1,1H47a1,1,0,0,1-1-1V9a1,1,0,0,1,1-1H59a1,1,0,0,1,1,1Z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M57 52H49a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zM41 52H33a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zM57 10H49a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zM41 10H33a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zM33 46a4 4 0 1 0 4-4A4 4 0 0 0 33 46zm4-2a2 2 0 1 1-2 2A2 2 0 0 1 37 44zM49 46a4 4 0 1 0 4-4A4 4 0 0 0 49 46zm4-2a2 2 0 1 1-2 2A2 2 0 0 1 53 44zM13.44 52.12L5.71 50.05A1 1 0 1 0 5.19 52l7.73 2.07a1 1 0 1 0 .52-1.93zM24.31 11.55L16.58 9.48a1 1 0 1 0-.52 1.93l7.73 2.07a1 1 0 1 0 .52-1.93zM12.16 41.43A4 4 0 1 0 15 46.33 4 4 0 0 0 12.16 41.43zm.9 4.38a2 2 0 1 1-1.41-2.45A2 2 0 0 1 13.06 45.81zM19.08 19.47L17.15 19a1 1 0 0 0-.52 1.93l1.93.52a1 1 0 0 0 .52-1.93zM17.79 24.3l-1.93-.52a1 1 0 0 0-.52 1.93l1.93.52a1 1 0 1 0 .52-1.93zM16.49 29.13l-1.93-.52A1 1 0 0 0 14 30.54l1.93.52a1 1 0 1 0 .52-1.93zM15.2 34l-1.93-.52a1 1 0 1 0-.52 1.93l1.93.52A1 1 0 1 0 15.2 34zM20.37 14.64l-1.93-.52a1 1 0 0 0-.52 1.93l1.93.52a1 1 0 0 0 .52-1.93zM36 21h2a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM36 26h2a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM36 31h2a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM36 36h2a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM36 16h2a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM52 21h2a1 1 0 0 0 0-2H52a1 1 0 0 0 0 2zM52 26h2a1 1 0 0 0 0-2H52a1 1 0 0 0 0 2zM52 31h2a1 1 0 0 0 0-2H52a1 1 0 0 0 0 2zM52 36h2a1 1 0 0 0 0-2H52a1 1 0 0 0 0 2zM52 16h2a1 1 0 0 0 0-2H52a1 1 0 0 0 0 2z"
    ></path>
  </svg>
);

export const AskOropIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={props.size || "64"}
    height={props.size || "64"}
    viewBox="0 0 64 64"
  >
    <path fill="#becde8" d="M37 53L31 59 32 62 36 62 41 57z"></path>
    <path
      fill="#cda1a7"
      d="M58,19H6c-1.657,0-3,1.343-3,3v27c0,1.657,1.343,3,3,3h52c1.657,0,3-1.343,3-3V22 C61,20.343,59.657,19,58,19z"
    ></path>
    <path
      fill="#c4939c"
      d="M60,52H4c-0.552,0-1-0.448-1-1v-1c0-2.209,1.791-4,4-4h50c2.209,0,4,1.791,4,4v1 C61,51.552,60.552,52,60,52z"
    ></path>
    <path
      fill="#cda1a7"
      d="M61,8H3c-1.105,0-2,0.895-2,2v9.803c0,1.87,1.295,3.49,3.119,3.902L32,30l27.881-6.296 C61.705,23.292,63,21.672,63,19.803V10C63,8.895,62.105,8,61,8z"
    ></path>
    <path
      fill="#dbb2ba"
      d="M3,8h58c1.105,0,2,0.895,2,2l0,0c0,1.657-1.343,3-3,3H4c-1.657,0-3-1.343-3-3l0,0 C1,8.895,1.895,8,3,8z"
    ></path>
    <path
      fill="#f9e3ae"
      d="M34,33h-4c-0.552,0-1-0.448-1-1v-6c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v6 C35,32.552,34.552,33,34,33z"
    ></path>
    <path fill="#ffeb97" d="M49 31A14 14 0 1 0 49 59A14 14 0 1 0 49 31Z"></path>
    <path fill="#abdef9" d="M49 35A10 10 0 1 0 49 55A10 10 0 1 0 49 35Z"></path>
    <path fill="#c6edff" d="M49 39A6 6 0 1 0 49 51A6 6 0 1 0 49 39Z"></path>
    <path
      fill="#f2f2f2"
      d="M46 39A3 3 0 1 0 46 45 3 3 0 1 0 46 39zM52.5 47A1.5 1.5 0 1 0 52.5 50 1.5 1.5 0 1 0 52.5 47z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M64,19.8V10c0-1.65-1.35-3-3-3H43.535l-3.109-4.664C39.868,1.499,38.935,1,37.93,1H26.07 c-1.005,0-1.938,0.499-2.496,1.336L20.465,7H3c-1.65,0-3,1.35-3,3v9.8c0,1.63,0.76,3.09,2,4V50c0,1.65,1.35,3,3,3h30.419 l-4.299,4.29c-1.49,1.5-1.49,3.92,0,5.42c0.75,0.74,1.73,1.12,2.71,1.12c0.98,0,1.96-0.38,2.71-1.12l4.58-4.59 c0.08-0.08,0.15-0.15,0.21-0.24C43.57,59.23,46.2,60,49,60c8.27,0,15-6.73,15-15c0-2.72-0.73-5.27-2-7.47V23.8 C63.24,22.89,64,21.43,64,19.8z M25.238,3.445C25.424,3.166,25.735,3,26.07,3H37.93c0.335,0,0.646,0.166,0.832,0.445L41.131,7 H22.869L25.238,3.445z M35.12,61.29c-0.71,0.72-1.87,0.72-2.58,0c-0.72-0.71-0.72-1.87,0-2.58l4.57-4.58 c0.75,0.97,1.61,1.85,2.57,2.61L35.12,61.29z M59.25,52.98C56.88,56.03,53.17,58,49,58c-2.58,0-4.98-0.75-7-2.05 c-1.24-0.8-2.34-1.79-3.24-2.95c-0.29-0.36-0.55-0.74-0.79-1.14c-0.18-0.28-0.35-0.57-0.5-0.86c-0.64-1.23-1.1-2.58-1.31-4 C36.05,46.35,36,45.68,36,45c0-7.17,5.83-13,13-13c4.63,0,8.7,2.43,11,6.08c1.27,2.01,2,4.38,2,6.92C62,48,60.97,50.78,59.25,52.98 z M49,30c-8.27,0-15,6.73-15,15H7c-0.55,0-1,0.45-1,1s0.45,1,1,1h27.14c0.18,1.41,0.57,2.75,1.12,4H5c-0.55,0-1-0.45-1-1V24.7 l24,5.43V32c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-1.87l24-5.43v10.12C57.26,31.86,53.34,30,49,30z M30,26h4v6h-4V26z M60,22.63 c-0.11,0.04-0.22,0.07-0.34,0.1L36,28.07V26c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v2.07L4.34,22.73C4.22,22.7,4.11,22.67,4,22.63 c-1.2-0.42-2-1.54-2-2.83V15c0.552,0,1-0.447,1-1v-2c0-0.553-0.448-1-1-1v-1c0-0.55,0.45-1,1-1h16.131h25.737H61c0.55,0,1,0.45,1,1 v1c-0.552,0-1,0.447-1,1v2c0,0.553,0.448,1,1,1v4.8C62,21.09,61.2,22.21,60,22.63z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M7 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C8 11.447 7.552 11 7 11zM12 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C13 11.447 12.552 11 12 11zM17 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C18 11.447 17.552 11 17 11zM22 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C23 11.447 22.552 11 22 11zM27 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C28 11.447 27.552 11 27 11zM32 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C33 11.447 32.552 11 32 11zM37 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C38 11.447 37.552 11 37 11zM42 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C43 11.447 42.552 11 42 11zM47 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C48 11.447 47.552 11 47 11zM52 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C53 11.447 52.552 11 52 11zM57 11c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C58 11.447 57.552 11 57 11zM48.914 34C42.896 34 38 38.896 38 44.914s4.896 10.914 10.914 10.914c6.018 0 10.914-4.896 10.914-10.914S54.932 34 48.914 34zM48.914 53.828c-4.915 0-8.914-3.999-8.914-8.914S43.999 36 48.914 36s8.914 3.999 8.914 8.914S53.829 53.828 48.914 53.828z"
    ></path>
    <path
      fill="#8d6c9f"
      d="M48.914,37.826c-0.552,0-1,0.447-1,1s0.448,1,1,1c2.042,0,3.88,1.214,4.682,3.094 c0.162,0.38,0.532,0.607,0.92,0.607c0.131,0,0.264-0.025,0.392-0.08c0.508-0.217,0.744-0.805,0.527-1.312 C54.319,39.518,51.759,37.826,48.914,37.826z"
    ></path>
  </svg>
);
