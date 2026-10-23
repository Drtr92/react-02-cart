import {useState} from "react";

function App() {

    const [name, setName] = useState("");   // input 관리용
    const [cart, setCart] = useState([]);   // 목록

    // cart는 목록입니다. 요소의 형태를 생각해보면,
    // 이 요소는 이름을 가져야되고, 수량도 가져야 됨

    return (
        <>
            <h2>Simple shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (name === "" || name === " ") {
                        return;
                    }
                    setCart([...cart, {name: name, quantity: 1}]);
                    setName("");
                }}>
                    <input
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                    />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       // React에서 style 속성은 객체로 전달해줄 수 있으며,
                       // key: value 형태로 프로퍼티를 기록하는데
                       // key에는 camelCase로 작성해주어야 함
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
                            // 지금 현재 수량이 1 이하이면, 실행하지 않게끔
                            if (item.quantity <= 1) {return;}
                            const newCart = [...cart];
                            newCart[index].quantity -= 1;
                            setCart(newCart);


                        }}>-</button>
                        {item.quantity}
                        <button onClick={() => {
                            // cart의 정보 중, index 자리에 있는 요소의 quantity 값을 + 1
                            // cart[index].quantity += 1;  =>  이렇게 쓰면 안됨 / react가 바뀐걸 감지를 못함
                            //                             =>  state의 값을 바꿀땐 set을 쓰라고 했음

                            // 1. react가 알아채게끔 하려면, 새 배열을 cart에 넣어야 됨 => 새 배열을 만들고
                            // 2. 값을 바꾸고
                            // 3. 그렇게 만들어진 배열을 setCart에 넣게 단계벌로 진행하는게 이해하기 쉽고 편함
                              const newCart = [...cart];
                              newCart[index].quantity += 1;
                              setCart(newCart);


                        }}>+</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            const result = cart.filter((_, i) => { return i !== index });
                            setCart(result);
                        }}>삭제</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : {cart.reduce((sum, item) => { return item.quantity + sum }, 0)}개</h3>
        </>
    );
}

export default App;