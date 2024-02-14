// Модули
import React from 'react'
// Компоненты
import Counter from '../../components/Counter/Counter.js'
// Стили
import './MKTPage.css'

export default function MKTPage() {
	return (
		<>
			<section className='counter__section'>
				<Counter id='MKT' />
			</section>
			<section className='list__section'>
				<p>Причины блокировки МКТ:</p>
				<ol>
					<li>
						Описание в карточке не соответствует товару: <Counter id='MKT1' targetId='MKT' />
					</li>
					<li>
						Пересорт: <Counter id='MKT2' targetId='MKT' />
					</li>
					<li>
						Запрещенный к продаже товар для самозанятых: <Counter id='MKT3' targetId='MKT' />
					</li>
					<li>
						Запрещенный к продаже товар: <Counter id='MKT4' targetId='MKT' />
					</li>
					<li>
						Использование карточки для другого товара: <Counter id='MKT5' targetId='MKT' />
					</li>
					<li>
						По запросу правообладателя товарного знака: <Counter id='MKT6' targetId='MKT' />
					</li>
					<li>
						Фотография в карточке не соответствует товару: <Counter id='MKT7' targetId='MKT' />
					</li>
					<li>
						Изображение упаковки не соответствует фактической: <Counter id='MKT8' targetId='MKT' />
					</li>
					<li>
						Использование фотографий другого продавца: <Counter id='MKT9' targetId='MKT' />
					</li>
					<li>
						Подозрение на контрафакт: <Counter id='MKT10' targetId='MKT' />
					</li>
					<li>
						По запросу контролирующих органов: <Counter id='MKT11' targetId='MKT' />
					</li>
					<li>
						По запросу контролирующих органов ФАС: <Counter id='MKT12' targetId='MKT' />
					</li>
				</ol>
			</section>
		</>
	)
}
