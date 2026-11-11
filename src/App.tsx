import { type ChangeEvent, type SubmitEvent, useState } from "react";
import GlobalStyle from "./GlobalStyle.ts";
import styled from "styled-components";

type Product = {
    name: string;
    quantity: number;
};

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
    font-size: 1.8rem;
    color: #1f2937;
    margin-bottom: 20px;
    text-align: center;
`;

const Fieldset = styled.fieldset`
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    background-color: #f9fafb;
`;

const Legend = styled.legend`
    font-weight: 600;
    color: #4b5563;
    padding: 0 8px;
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px 16px;
    font-size: 1rem;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
    background-color: white;
    &:focus = {
        border-color: #3b82f6;
    }
`;

const SubmitButton = styled.button`
    padding: 12px 20px;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #2563eb;
    }
`;

const TableWrapper = styled.div`
    width: 100%;
    /*
        가로축으로 자식의 크기가 더 크면, 스크롤바를 보여주겠다
        가로축으로 자식의 크기가 작으면, 스크롤바는 안 보여줄거구
    */
    overflow-x: auto;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.95rem;
    th,
    td {
        padding: 14px 16px;
        border-bottom: 1px solid #e5e7eb;
    }

    th {
        background-color: #f3f4f6;
        color: #374151;
        font-weight: 600;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: #f9fafb;
    }
`;

const QuantityGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const QtyButton = styled.button`
    padding: 6px 10px;
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    color: #374151;
    transition: all 0.2s;


&:hover {
    background-color: #e5e7eb;
}
`;

const QuantityText = styled.span`
    min-width: 24px;
    text-align: center;
    font-weight: 600;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    background-color: #fee2e2;
    color: #dc2626;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;

&:hover {
    background-color: #fecaca;
}
`;

const Summary = styled.h3`
    font-size: 1.1rem;
    color: #374151;
    text-align: right;
    font-weight: 600;
`;

function App() {
    const [name, setName] = useState<string>("");
    const [cart, setCart] = useState<Product[]>([]);

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedName = name.trim();
        if (!trimmedName) {
            return;
        }
        setCart([...cart, { name: name, quantity: 1 }]);
        setName("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleUpdateQuantity = (targetIndex: number, number: number) => {
        // 1. 최소 수량 체크
        if (cart[targetIndex].quantity + number < 1) return;

        // 2. map을 돌면서 수정할 대상 객체만 {...item}으로 새로 복제하여 반환
        const updatedCart = cart.map((item, index) => {
            if (index === targetIndex) {
                return {
                    ...item, // 객체 복제 (새 메모리 주소 생성)
                    quantity: item.quantity + number, // 변경할 속성만 덮어쓰기
                };
            }
            return item; // 바뀌지 않은 객체는 그대로 유지
        });

        setCart(updatedCart);
    };

    const totalQuantity = cart.reduce((sum, item) => {
        return item.quantity + sum;
    }, 0);

    const handleDeleteButton = (index: number) => {
        const result = cart.filter((_, i) => {
            return i !== index;
        });
        setCart(result);
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>Simple shop</Title>
                <Fieldset>
                    <Legend>상품 추가</Legend>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            onChange={handleChange}
                            placeholder={"상품명을 입력하세요"}
                            value={name}
                        />
                        <SubmitButton type={"submit"}>카트에 담기</SubmitButton>
                    </Form>
                </Fieldset>
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>수량 제어</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <QuantityGroup>
                                            <QtyButton
                                                onClick={() => {
                                                    handleUpdateQuantity(index, -10);
                                                }}>
                                                -10
                                            </QtyButton>
                                            <QtyButton
                                                onClick={() => {
                                                    handleUpdateQuantity(index, -1);
                                                }}>
                                                -1
                                            </QtyButton>
                                            <QuantityText>{item.quantity}</QuantityText>
                                            <QtyButton
                                                onClick={() => {
                                                    handleUpdateQuantity(index, 1);
                                                }}>
                                                +1
                                            </QtyButton>
                                            <QtyButton
                                                onClick={() => {
                                                    handleUpdateQuantity(index, 10);
                                                }}>
                                                +10
                                            </QtyButton>
                                        </QuantityGroup>
                                    </td>
                                    <td>
                                        <DeleteButton
                                            onClick={() => {
                                                handleDeleteButton(index);
                                            }}>
                                            삭제
                                        </DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
                <Summary>
                    총 품목 : {cart.length}개 / 총 수량 : {totalQuantity}개
                </Summary>
            </Container>
        </>
    );
}

export default App;
