import { replace } from "lodash";

const getTimecode = (url) => {
  if (!url) {
    return;
  }
  const splittedUrl = url.split("t=");
  const timecode = replace(splittedUrl?.[2], "s", "");
  return timecode;
};

const getYoutubeId = (url) => {
  if (!url) {
    return "";
  }
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "";
  }
};

const getEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) {
    return;
  }
  const youtubeId = getYoutubeId(youtubeUrl);
  const timecode = getTimecode(youtubeUrl);
  return `https://www.youtube.com/embed/${youtubeId}?start=${timecode}`;
};

const YoutubeEmbed = ({ youtubeUrl }) => {
  const embedUrl = getEmbedUrl(youtubeUrl);

  return (
    <iframe
      allowfullscreen=""
      frameborder="0"
      height="250"
      width={450}
      src={embedUrl}
      id={getYoutubeId(youtubeUrl)}
      className="max-w-full"
    ></iframe>
  );
};

export default YoutubeEmbed;
