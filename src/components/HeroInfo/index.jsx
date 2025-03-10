import { memo, lazy } from "react";
import PropTypes from 'prop-types';
const TypewriterEffect = lazy(() => import("../TypewriterEffect"));
import styles from './HeroInfo.module.scss'

const HeroInfo = ({title, description, typewrite}) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <TypewriterEffect typewrite={typewrite} className={styles.developer} />
      <p className={styles.subtext}>{description}</p>
    </>
  );
};

HeroInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  typewrite: PropTypes.string,
}

export default memo(HeroInfo);
