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

        const newCart = [...cart];
        const nextQuantity = newCart[index].quantity + number;
        if (nextQuantity < 1) {
            return;
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
                        <button onClick={() => {
                            handleUpdateQuantity(index, -10)
                        }}>-
                        </button>
                        <button onClick={() => {
                            handleUpdateQuantity(index, -1)
                        }}>-
                        </button>
                        {item.quantity}
                        <button onClick={() => {
                            handleUpdateQuantity(index, +1)
                        }}>+
                        </button>
                        <button onClick={() => {
                            handleUpdateQuantity(index, +10)
                        }}>+
                        </button>
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