import React from 'react'
import githubLogo from '../github.png'

export const Header = () => {
    return (
        <div className="d-flex justify-content-between mt-4">
            <div>
                <h1 className="display-5"> Weather App </h1>
            </div>
            <div className="github-img-container my-auto">
                <a href="https://github.com/oscarenriqq" target="_blank" rel="noreferrer">
                    <img src={ githubLogo } alt="github"/>
                </a>
            </div>
        </div>
    )
}
