import {useState} from "react";

function App() {

    const [name, setName] = useState("");
    const [cart, setCart] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || name === " ") {
            return;
        }
        setCart([...cart, {name: name, quantity: 1}]);
        setName("");
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleDeleteButton = (index) => {
        const result = cart.filter((_, i) => {
            return i !== index
        });
        setCart(result);
    }

    const handleUpdateQuantity = (index, number) => {
        // 기능을 합쳐서 핸들러를 만드는데,
        // '1을 더하고', '1을 빼고' 하는 기능이 아니라, "수량을 변경하는 함수"로 만듦
        // 얼마를 바꾸느냐는 이 함수를 실행하는 곳에서 결정(매개변수로 전달)
        // if (cart[index].quantity <= 1) {
        //     return;
        // }
        const newCart = [...cart];
        // newCart[index].quantity += 1;
        const nextQuantity = newCart[index].quantity + number;
        // 그렇게 -3 해달라는 명령을 처리했을 때 nextQuantity가 마이너스 값이면 하면 안됨
        // 이 조건은 nextQuantity 계산을 한 뒤에 if 처리를 해줘야함
        if (nextQuantity < 1) {
            return; // nextQuantity를 구하긴 했지만, 업데이트를 안하고 종료
        }
        newCart[index].quantity = nextQuantity;
        setCart(newCart);
    }

    const totalQuantity = cart.reduce((sum, item) => {
        return item.quantity + sum
    }, 0);

    return (
        <>
            <h2>Simple shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                    />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       width: "100%",
                       borderCollapse: "collapse"
                   }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>상품명</th>
                    <th>수량 제어</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                        <button onClick={() => {handleUpdateQuantity(index, -1)}}>-</button>
                        {item.quantity}
                        <button onClick={() => {handleUpdateQuantity(index, +1)}}>+</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            handleDeleteButton(index)
                        }}>삭제
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : {totalQuantity}개</h3>
        </>
    );
}

export default App;