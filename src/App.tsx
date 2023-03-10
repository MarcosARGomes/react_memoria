import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { InfoItem } from './components/InfoItem';
import { Button } from './components/InfoItem/Button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


const App = () => {

  const [playing, setPlayng] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMovieCount] = useState<number>(0);
  const [shownCount, setShowCount] = useState<number>(0);
  const [gridItemns, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer)
  }, [playing, timeElapsed]);

  //verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItemns.filter(item => item.shown === true);
      if (opened.length === 2) {
        //1° Verificação, se forem iguais tornalos permanents.
        if (opened[0].item === opened[1].item) {
          let tempGrid = [...gridItemns];

          for (let i in tempGrid) {
            if (tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShowCount(0);
          }
        } else {
          //Verificação dois, se não são iguais fechamos todos
          setTimeout(() => {
            let tempGrid = [...gridItemns];
            for (let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShowCount(0);
          }, 1000)
        }

        setMovieCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItemns])

  //verificar quando o jogo acabar.
  useEffect(() => {
    if(moveCount > 0 && gridItemns.every(item => item.permanentShown === true)){
      setPlayng(false)
    }
  }, [moveCount,gridItemns]);

  const resetAndCreateGrid = () => {
    //1 - Resetar o jogo.
    setTimeElapsed(0);
    setMovieCount(0);
    setShowCount(0);

    //2 - Criar um grid Vázrio

    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }

    //2.1 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;

      }
    }


    //2.2 Jogar no state
    setGridItems(tempGrid)
    //3 - Iniciar o Jogo
    setPlayng(true);

  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItemns];

      if (tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true;
        setShowCount(shownCount + 1);
      }
      setGridItems(tempGrid);


    }
  }

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt="Logo" />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}></InfoItem>
            <InfoItem label='Movimentos' value={moveCount.toString()}></InfoItem>
          </C.InfoArea>
          <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}></Button>
        </C.Info>

        <C.GridArea>
          <C.Grid>
            {gridItemns.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />

            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}
export default App;