import BoardClassic from "./BoardClassic";

export default function BoardSuper({ cells }) {
    // console.log(cells);
    // const boardCells = cells.map((a, i) => {

    //     return <BoardClassic key={i} cells={a} />;
    // });
    return (
        <div className={`board-classic`}>
            <div className="board-classic--row">
                {cells[0]}
                <div className="board-classic--cell-spacer"></div>
                {cells[1]}
                <div className="board-classic--cell-spacer"></div>
                {cells[2]}
            </div>
            <div className="board-classic--row-spacer"></div>
            <div className="board-classic--row">
                {cells[3]}
                <div className="board-classic--cell-spacer"></div>
                {cells[4]}
                <div className="board-classic--cell-spacer"></div>
                {cells[5]}
            </div>
            <div className="board-classic--row-spacer"></div>
            <div className="board-classic--row">
                {cells[6]}
                <div className="board-classic--cell-spacer"></div>
                {cells[7]}
                <div className="board-classic--cell-spacer"></div>
                {cells[8]}
            </div>
        </div>
    );
}
