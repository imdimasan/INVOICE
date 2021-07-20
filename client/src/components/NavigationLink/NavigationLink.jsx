import {NavLink} from "react-router-dom"
import "./NavigationLink.scss"

function NavigationLink ({
    children,
    externalLink = false,
    openInNewTab = false, 
    onClick,
    href,
    className,
    title
}) {
    return externalLink ? (
        <a
        href={href}
        onClick={onClick}
        className={className}
        target={openInNewTab? "_blank" : "_self"}
        rel={"noreferrer"}
        title={title}
        >{children}</a>
        ) : (         
            <NavLink
            exact
            to={href}
            onClick = {onClick}
            className={className}
            title={title}
            >{children}</NavLink>
    )
}

export default NavigationLink