import React from "react"
import "./Text.scss"

function Text ({variant = "p", className, children}) {
    return React.createElement (
        variant,
        className = {className},
        children
    )
}

export default Text