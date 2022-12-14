import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleStatusTodo } from "../redux/modules/todos";
import {Link} from "react-router-dom"
import styled from "styled-components";

const List = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);

    const onDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };
    const onToggleStatusTodo = (id) => {
        dispatch(toggleStatusTodo(id));
    };

    return (
    <StListContainer>
      <StCardContainer>
      <h2>ํด์ผ ํ  ์ผ ๐</h2>
      <StSquareList1>
        {todos.map((todo) => {
          if (!todo.isDone) {
            return (
              <StTodoContainer key={todo.id}>
                <StLink to={`${todo.id}`}>
                <StLinkTitle>{todo.order}๋ฒ details โก๏ธ</StLinkTitle>
                </StLink>
                <StTodoTitle>{todo.title}</StTodoTitle>
                <StTodoBody>{todo.body}</StTodoBody>
              <StTodoButtonSet>
              <StTodoButtonDelete onClick={() => onDeleteTodo(todo.id)}>์ญ์ ํ๊ธฐ</StTodoButtonDelete>
              <StTodoButtonEdit onClick={() => onToggleStatusTodo(todo.id)}>{!todo.isDone ? "์๋ฃ" : "์ทจ์"}</StTodoButtonEdit>
              </StTodoButtonSet>
              </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StSquareList1>
      </StCardContainer>
      <StCardContainer>
      <h2 className="list-title">๊ทธ๋๋ง ํ ์ผ โ๏ธ</h2>
      <StSquareList2>
        {todos.map((todo) => {
          if (todo.isDone) {
            return (
                <StTodoContainer key={todo.id}>
                  <StLink to={`${todo.id}`}>
                  <StLinkTitle>{todo.order}๋ฒ details โก๏ธ</StLinkTitle>
                  </StLink>
                  <StTodoTitle>{todo.title}</StTodoTitle>
                  <StTodoBody>{todo.body}</StTodoBody>
                  <StTodoButtonSet> 
                  <StTodoButtonDelete onClick={() => onDeleteTodo(todo.id)}>์ญ์ ํ๊ธฐ</StTodoButtonDelete>
                  <StTodoButtonEdit onClick={() => onToggleStatusTodo(todo.id)}>{!todo.isDone ? "์๋ฃ" : "์ทจ์"}</StTodoButtonEdit>
                  </StTodoButtonSet> 
                </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StSquareList2>
      </StCardContainer>
    </StListContainer>
    )
}
export default List;


const StListContainer = styled.div`
  padding: 0 20px;
  border: 4px solid rgba(238, 107, 255, 0.377);
  padding-bottom: 10px;
  min-height: 600px;
  display: flex;
  flex-direction: column;

`;
const StSquareList1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 23px;
  border-radius: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
  justify-content: flex-start;
  
`;
const StSquareList2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border-radius: 10px;
  padding: 0 20px;
  margin-bottom: 20px;
  justify-content: flex-start;
`;
const StTodoContainer = styled.div`
  width: 130px;
  border: 3px solid rgb(255, 198, 40);
  border-radius: 10px;
  padding: 10px 10px 20px 10px;
`;
const StTodoButtonSet = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  justify-content: space-between;
`;
const StTodoButtonDelete = styled.button`
  border: 2px solid red;
  border-radius: 5px;
  cursor: pointer;
`;
const StTodoButtonEdit = styled.button`
  border: 2px solid rgb(49, 207, 255);
  border-radius: 10px;
  cursor: pointer;
`;
const StTodoTitle = styled.div`
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: rgb(231, 13, 13);
`;
const StLink = styled(Link)`
  text-decoration: none;
  text-align: right;
`;
const StLinkTitle = styled.div`
  text-align: right;
  font-size: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline};
`;
const StCardContainer = styled.div`
  min-height: 200px;
  max-height: 600px;
  padding: 20px;
`;
const StTodoBody = styled.div`
  font-size: small;
  overflow: hidden;
  `

//12. ๋ฆฌํด์ ๊ทธ์ ์ ํ๋๊ฑฐ ๊ธ์ด์ค๊ณ , ํธ๋ค๋ฌ ์ ์ธ, ์ด๋ฆ์์ .
//12-1.์ง๋์ฃผ ๋ฆฌํด์ ๋ฐ์์ฒ๋ผ Todo component์์ ๊ฐ์ฒด ๊ฐ์ ๊ฐ์ ธ์๋ค๋ฉด,
//<Todo todo={todo} key={todo.id} onDeleteHandler={onDeleteHandler} onEdit={onEdit}/>
//์  Todo ์ปดํฌ๋ํธ๋ ์ด์  ๋ชจ๋๋ก์ ํจ์๋ฅผ ๋๋ฆฌ๋ ๋ฆฌ๋์์ ์ก์ํฌ๋ฆฌ์์ดํฐ๋ฅผ ๋ณด๋ด๋ ์ญํ ์ํ๋, 
//{todo.title} ์ด๋ฐ์์ผ๋ก ๊ฐ์ฒด์ ํค๊ฐ์ ๊ฐ์ ธ์จ๋ค.
//์ด๋ฒ์๋ ์ญ์ ํธ๋ค๋ฌ์ ์ทจ์/์๋ฃํธ๋ค๋ฌ์ ๋ณต์กํ ํจ์๋ reducer์์ ๋๋ฆฌ๊ณ , List ์ปดํฌ๋ํธ์์๋ dispatchํ์ฌ ๋ณด๋.
//๊ทธ๋ฆฌ๊ณ  reducer ํจ์๋ฅผ ๊ฑฐ์น๊ณ  ๋ฐํํ ๊ฐ์ ์ก์ํฌ๋ฆฌ์์ดํฐ๋ฅผ ๋ฒํผ ์จํด๋ฆญ์ ์ฐ๊ฒฐํจ.
//15. todo์นด๋์ ์์ธ๋ณด๊ธฐ ๋งํฌ ์ฐ๊ฒฐํ๊ธฐ 
// <Link to={`${todo.id}`}> ๋งํฌ//detail

