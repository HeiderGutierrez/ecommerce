import { CartContext } from '@/context';
import { currency } from '@/utils';
import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';

interface Props {
  orderValues?: {
    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number;
  }
}

export const OrderSummary = ({ orderValues }: Props) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);
  const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, tax, total };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant='subtitle1' fontSize={14} fontWeight={500}>N. Products</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'Products' : 'product'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='subtitle1' fontSize={14} fontWeight={500}>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{currency.format( summaryValues.subTotal )}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='subtitle1' fontSize={14} fontWeight={500}>Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{currency.format( summaryValues.tax )}</Typography>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='subtitle1' fontSize={14} fontWeight={500}>Total</Typography>
        <Typography variant='subtitle1' fontSize={20} fontWeight={500}>{currency.format( summaryValues.total )}</Typography>
      </Grid>
    </Grid>
  )
}
