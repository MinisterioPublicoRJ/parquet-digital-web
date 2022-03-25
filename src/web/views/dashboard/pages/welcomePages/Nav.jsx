import {useEffect} from 'react';

function Nav(hist){
  useEffect(onMount, []);
  
  function onMount() {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  };
  
  function onKeyDown({key}) {
    if (key === "ArrowRight"){
      hist.push(getPath(hist, "next"));
    }
    if (key === "ArrowLeft"){
      hist.push(getPath(hist, "previous"));
    }
    if (key === "Escape"){
      hist.push(getPath(hist, "dash"));
    }
    if (key ==="Enter"){
      hist.push(getPath(hist, "dash"));
    }
  }
}

function getPath(hist, direction) {
  if(direction==="next"){
    switch(hist.location.pathname){
      case "/gestao": return("./entendimento");
      case "/entendimento": return("./celeridade");
      case "/celeridade": return("./atuacao");
      case "/atuacao": return("./dashboard");
      default: return null;
    }
  }
  else if(direction==="previous"){
    switch(hist.location.pathname){
      case "/gestao": return("./gestao");
      case "/entendimento": return("./gestao");
      case "/celeridade": return("./entendimento");
      case "/atuacao": return("./celeridade");
      default: return null;
    }
  }
  else if(direction==="dash"){
    return("./dashboard");
  }
  else return(hist.location.pathname);
}

export {
  Nav,
  getPath
};