import Modal from "react-modal";
import closeImg from "../assets/close.svg";
import incomeImg from "../assets/income.svg";
import outComeImg from "../assets/outcome.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { FormEvent, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [title, setTile] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransition(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });
    setTile("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransition}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTile(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            activeColor="green"
            isActive={type === "deposit"}
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            activeColor="red"
            isActive={type === "withdraw"}
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outComeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
