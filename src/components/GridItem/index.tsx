import { GridItemType } from '../../types/GridItemTypes'
import * as C from './style'
import { items } from '../../data/item'

type Props ={
    item: GridItemType,
    onClick: () => void
}
export const GridItem = ({item, onClick}: Props) =>{
    return( 
        <C.Container 
            showBackground = {item.shown || item.permanentShown}
            onClick={onClick}
        >
            {!item.shown && !item.permanentShown &&
                '?'
            }
            {(item.shown || item.permanentShown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=""/>
            }
        </C.Container>
    )
}