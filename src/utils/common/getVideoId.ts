export const getVideoId = (url: string, site: string) => {
  const siteLower = `${site}`.toLowerCase();

  if (!url || !site) {
    return false;
  }

  if (siteLower === 'youtube') {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  if (siteLower === 'tiktok') {
    // Parse basic url and embeds
    const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
    const basicParsed = basicReg.exec(url);
    if (basicParsed && basicParsed.length > 2) {
      return basicParsed[2];
    }
  }

  if (siteLower === 'vimeo') {
    let string_ = url;
    if (string_.includes('#')) {
      [string_] = string_.split('#');
    }

    if (string_.includes('?') && !string_.includes('clip_id=')) {
      [string_] = string_.split('?');
    }

    let id;
    let array;

    const event = /https?:\/\/vimeo\.com\/event\/(\d+)$/;

    const eventMatches = event.exec(string_);

    if (eventMatches && eventMatches[1]) {
      return eventMatches[1];
    }

    const primary = /https?:\/\/vimeo\.com\/(\d+)/;

    const matches = primary.exec(string_);
    if (matches && matches[1]) {
      return matches[1];
    }

    const vimeoPipe = [
      'https?://player.vimeo.com/video/[0-9]+$',
      'https?://vimeo.com/channels',
      'groups',
      'album',
    ].join('|');

    const vimeoRegex = new RegExp(vimeoPipe, 'gim');

    if (vimeoRegex.test(string_)) {
      array = string_.split('/');
      if (array && array.length > 0) {
        id = array.pop();
      }
    } else if (/clip_id=/gim.test(string_)) {
      array = string_.split('clip_id=');
      if (array && array.length > 0) {
        [id] = array[1].split('&');
      }
    }

    return id;
  }

  return false;
};
