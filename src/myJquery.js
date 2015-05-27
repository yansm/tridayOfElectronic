$(function () {
	var buildSlider = function (){
		var index = 0, $list = $('.slider-list li'), length = $list.length, loopTime = 5000;
		$list.eq(index).addClass('current');
		setInterval(function () {
			index ++;
			$list.eq(index%3).siblings().removeClass('current');
			setTimeout(function () {
				$list.eq(index%3).addClass('current');
			},500);
		}, loopTime);
	}
	
	buildSlider();
});