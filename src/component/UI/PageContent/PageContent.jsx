import classes from './PageContent.module.css';

const PageContent= ({children, className}) => {
    return (
        <div className={`${classes.content} ${className}`}>
            {children}
        </div>
    );
};

export default PageContent;