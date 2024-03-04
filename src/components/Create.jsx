// interface Props {
//   onClick: () => void;
// }

export default function Create(props) {
  return (
    <>
      <h1>Family Tree Demo</h1>
      <button className="create--button" onClick={props.onClick}>
        Create first person
      </button>
    </>
  );
}
