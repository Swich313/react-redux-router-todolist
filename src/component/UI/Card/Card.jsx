import classes from './Card.module.scss';

const Card = ({children, styles}) => {
    return (
        <div className={`${classes.card} ${styles}`}>{children}</div>
    );
};

export default Card;