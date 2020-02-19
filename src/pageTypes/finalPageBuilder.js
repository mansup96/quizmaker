function finalPageBuilder({ title, subtitle, imgSrc, buttonValue, onReady }) {
  let schema = [
    {
      tag: "h1",
      classList: "quiz-wrapper",
			value: 'Конец'
		},
		{
			tag: 'div',
			value: 'нажми',
			onclick: () => onReady()
		}
  ];
  return schema;
}

export default finalPageBuilder;