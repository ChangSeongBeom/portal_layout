import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  border: 2px solid #9AC5F4;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "#FDE5EC" : "white")};
  color: ${(props) => (props.isDragging ? "darkgreen" : "black")};
  font-size: ${(props) => (props.isDragging ? "20px" : "16px")};
  font-weight: ${(props) => (props.isDragging ? "600" : "400")};
`;
/* mui아이콘으로 대체*/
// const DeleteButtonCard = styled.button`
//   justify-self: center;
//   align-self: center;
//   padding: 4px;
//   margin: 0;
//   border: none;
//   cursor: pointer;
//   border-radius: 4px;
//   background-color: #e8384f;
//   color: white;
// `;
const CustomTrashButton = styled(IconButton)`

  

`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardHeaderTitle = styled.p`
  font-weight: 400;
`;

const CardDetails = styled.div``;
const CardDetailsContent = styled.p`
  font-size: 14px;
`;

const Card = ({ card, index, listId, deleteCard }) => {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
        >
          <CardHeader>
            <CardHeaderTitle>{card.title}</CardHeaderTitle>
           
            <CustomTrashButton aria-label="delete" size="small" onClick={() => deleteCard(listId, card.id)}>
              <DeleteIcon fontSize="small" />
            </CustomTrashButton>
            {/* <DeleteButtonCard onClick={() => deleteCard(listId, card.id)}>
              &#x2716;
            </DeleteButtonCard> */}
          </CardHeader>
          <CardDetails>
            <CardDetailsContent>{card.description}</CardDetailsContent>
          </CardDetails>
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
