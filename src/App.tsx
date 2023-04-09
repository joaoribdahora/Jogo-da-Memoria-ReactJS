import * as C from './App.style';
import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import itemIcon from './svgs/restart.svg';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemTypes';
import {items} from './data/item';
import { GridItem } from './components/GridItem';
import { formatTime } from './helpers/formatTime';

function App() {

  const [canPlay, setCanPlay] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [showMoves, setShowMoves] = useState<number>(0);
  const [countTime, setCountTime] = useState<number>(0);
  const [showTime, setShowTime] = useState<string>('00:00');
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(()=> clean(), [Button]);
  useEffect(()=>{
    const timer = setInterval(()=>{
      if(canPlay){ setCountTime(countTime + 1)};
    }, 1000);
    return ()=> clearInterval(timer);
  }, [canPlay, countTime]);

  useEffect(()=>{
    if(showMoves === 2){
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2){
        
        if(opened[0].item === opened[1].item){
          let tempGrid = [...gridItems];
          for(let i in tempGrid){
            if(tempGrid[i].shown){
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setShowMoves(0);
        }else{
          setTimeout( ()=>{
          let tempGrid = [...gridItems];
          for(let i in tempGrid){
            tempGrid[i].shown = false;
          }
                    
          setGridItems(tempGrid);
          setShowMoves(0);
          }, 1000);
        }
    
        setMoves( moves => moves + 1);
      }
    }

  }, [showMoves, gridItems]);

  useEffect(()=>{
    if(moves > 0 && gridItems.every(item => item.permanentShown === true)){
      setCanPlay(false);
    }
  }, [moves, gridItems]);

  const clean = () => {
    //Para recomeçar o jogo
    setMoves(0);
    setCountTime(0);
    setShowTime('00:00');
    setShowMoves(0);

    //Para começar o jogo
    setCanPlay(true);

    let newGrid: GridItemType[] = [];
    for(let i = 0; i< (items.length * 2); i++){
      newGrid.push(
        {
          item: null,
          shown: false,
          permanentShown: false
        }
      );
    }

    for(let j = 0; j<2; j++){
      for(let i = 0; i< items.length; i++){
        let pos = -1;
        while( pos<0 || newGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        newGrid[pos].item = i;
      }
    }

    setGridItems(newGrid);
    
  }

  const itemClick = (index: number) =>{
    if(canPlay && index !== null && showMoves < 2){
      let tempGrid = [...gridItems];

      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){
        tempGrid[index].shown = true;
        setShowMoves(showMoves + 1);
      }
      setGridItems(tempGrid);
    }
  }

  return (
    <div>
      <C.Container>
        <C.InfoArea>
          <C.Logo>
            Jogo da Memória
          </C.Logo>
          <C.Infos>
            <InfoItem label='Cronometro' value={formatTime(countTime)}/>
            <InfoItem label='Jogadas' value={moves.toString()}/>
          </C.Infos>
          <Button icon={itemIcon} label={'Reiniciar'} onClick={clean} />
        </C.InfoArea>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem 
              key = {index}
              item = {item}
              onClick = {() => itemClick(index)}
              />
            ))}

          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  );
}

export default App;
