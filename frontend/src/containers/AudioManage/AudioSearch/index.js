import React from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import { useTranslation } from 'react-i18next';
import AudioSearchStyle from './audioSearch.style';

export default function AudioSearch() {
  // const { t } = useTranslation();

  return (
    <AudioSearchStyle>
      <div className="audio-search-container">
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase placeholder="Tìm kiếm " />
      </div>
    </AudioSearchStyle>
  );
}
