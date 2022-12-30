import styles from 'styles/TiltBox.module.css';

const TiltBox = ({ top }: { top?: boolean }) => {
  return (
    <div className={`${styles.custom_shape} ${top ? styles.top : ''}`}>
      <svg
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1200 120'
        preserveAspectRatio='none'
      >
        <path
          d='M1200 120L0 16.48 0 0 1200 0 1200 120z'
          className={styles.shape_fill}
        ></path>
      </svg>
    </div>
  );
};

export default TiltBox;
