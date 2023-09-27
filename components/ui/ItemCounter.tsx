import { Box, IconButton, Typography } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter = ({currentValue, updatedQuantity, maxValue}: Props) => {
  const addOrRemove = ( value: number ) => {
    if ( value === -1 ) {
      if ( currentValue === 1 ) return;

      return updatedQuantity( currentValue - 1);
    }

    if ( currentValue >= maxValue ) return;

    updatedQuantity( currentValue + 1 );
  }
  return (
    <Box display={'flex'} alignItems={'center'} border={'1px solid rgba(0, 0, 0, 0.5)'}>
        <Typography sx={{width: 40, textAlign: 'center'}}>{currentValue}</Typography>
        <Box display={'flex'} flexDirection={'column'}>
          <IconButton onClick={() => addOrRemove(+1)} sx={{borderRadius: 0, borderLeft: '1px solid rgba(0, 0, 0, 0.5)'}} size='small'>
              <Add sx={{fontSize: 14}}/>
          </IconButton>
          <IconButton onClick={() => addOrRemove(-1)} sx={{borderRadius: 0, borderLeft: '1px solid rgba(0, 0, 0, 0.5)', borderTop: '1px solid rgba(0, 0, 0, 0.5)'}} size='small'>
              <Remove sx={{fontSize: 14}}/>
          </IconButton>
        </Box>
    </Box>
  )
}
