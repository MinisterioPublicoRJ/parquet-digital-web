import {useEffect} from 'react';

export function Nav(hist, cur){
  let path;
  useEffect(onMount, []);
  
  function onMount() {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  };
  
  function onKeyDown({key}) {
    if (key === "ArrowRight"){
      createPath(cur+1, hist);
    }
    if (key === "ArrowLeft"){
      createPath(cur-1, hist);
    }
    if (key === "Escape"){
      createPath(5, hist);
    }
    if (key ==="Enter" && cur===4){
      createPath(5, hist);
    }
  };
}

export function createPath(path, hist) {
  if(path===0){
    path=null;
  }
  else if(path===1){
    path="./gestao";
    hist.push(path);
  }
  else if(path===2){
    path="./entendimento";
    hist.push(path);
  }
  else if(path===3){
    path="./celeridade";
    hist.push(path);
  }
  else if(path===4){
    path="./atuacao";
    hist.push(path);
  }
  else if(path===5){
    path="./dashboard";
    hist.push(path);
  }
};