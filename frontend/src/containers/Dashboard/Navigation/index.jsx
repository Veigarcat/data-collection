import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigationStyle from './navigation.style';

export default function NavigationContainer({ navLink }) {
  return (
    <NavigationStyle>
      <div className="navigation">
        <Breadcrumbs className="mb-0" tag="nav">
          {navLink &&
            navLink.map((sub) =>
              sub.link ? (
                <Link
                  className="link-navigation link"
                  href={sub.link}
                  key={sub.title}
                >
                  {sub.title}
                </Link>
              ) : (
                <Typography color="textPrimary" className="link-navigation">
                  {sub.title}
                </Typography>
              ),
            )}
        </Breadcrumbs>
      </div>
    </NavigationStyle>
  );
}
