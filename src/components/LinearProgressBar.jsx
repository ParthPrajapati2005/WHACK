import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height:10,
    borderRadius:5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#6b7280',
        ...theme.applyStyles('dark', {
          backgroundColor: '#6b7280',
        }),
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#2dd4bf',
        ...theme.applyStyles('dark', {
          backgroundColor: '#2dd4bf',
        }),
      },
}))

function LinearProgressBar(){
    return(
        <BorderLinearProgress variant="determinate" value={50} />
    )
}

export default LinearProgressBar;