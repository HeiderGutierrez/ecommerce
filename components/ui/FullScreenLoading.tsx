import { Box, CircularProgress } from '@mui/material'

export const FullScreenLoading = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={'column'}
      height={"calc(100vh - 200px)"}
    >
      <CircularProgress thickness={2} />
    </Box>
  )
}
