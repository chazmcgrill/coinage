import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
    url: string;
    icon: IconName;
}

const Icon = ({ url, icon }: IconProps) => (
    <a href={url}>
        <FontAwesomeIcon icon={['fab', icon]} />
    </a>
);

const Footer = () => (
    <footer>
        <p>
            coded by<a href="https://www.charlietaylorcoder.com"> charlie taylor</a>
        </p>
        <div className="footer-icons">
            <Icon url="http://twitter.com/charlietcoder" icon="twitter" />
            <Icon url="http://www.instagram.com/charlietcoder" icon="instagram" />
            <Icon url="https://codepen.io/chazmcgrill" icon="codepen" />
            <Icon url="https://github.com/chazmcgrill" icon="github" />
        </div>
        <p>
            data sourced from<a href="https://www.cryptocompare.com/api/"> cryptocompare api</a>
        </p>
    </footer>
);

export default memo(Footer);
