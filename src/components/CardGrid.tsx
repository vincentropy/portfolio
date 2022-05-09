import { Grid, Paper } from '@mui/material';
import { IndexData, loadMarkdownFile } from '../api';
import { withLoader } from '../api/loader';
import { MarkdownCard } from './Markdown/MarkdownCard';
import Masonry from '@mui/lab/Masonry';

const LoadingMarkdown = withLoader(MarkdownCard, loadMarkdownFile);

// function GridItem(props: { filename: string }) {
//   return (
//     <Grid item xs={4}>
//       <Paper sx={{ height: '100%', margin:0, maxWidth:"400px"}}>
//         <LoadingMarkdown url={props.filename} />
//       </Paper>
//     </Grid>
//   );
// }

// export function CardGrid(props: { data: IndexData | null }) {
//   const { data } = { ...props };
//   const items =
//     data &&
//     data.pages.map((item, index) => (
//       <GridItem filename={item.filename} key={index} />
//     ));

//   return (
//     <Grid container>
//       {items}
//     </Grid>
//   );
// }


function GridItem(props: { filename: string }) {
    return (
      <div>
        <Paper sx={{ height: '100%', margin:0, maxWidth:"400px", width:'100%'}}>
          <LoadingMarkdown url={props.filename} />
        </Paper>
      </div>
    );
  }
  
  export function CardGrid(props: { data: IndexData | null }) {
    const { data } = { ...props };
    const items =
      data &&
      data.pages.map((item, index) => (
        <GridItem filename={item.filename} key={index} />
      ));

    
    return !items? <div/> : (
      <Masonry columns={{xs:1, sm:2, md:3}} style={{width:'100%'}} spacing={2}>
        {items}
      </Masonry>
    );
  }
