<div class="{{field_name}}_type model-field">
    <span class="field_label">Type</span>
    <div class="btn-group btn-group-type btn-group-radio" data-field-name="{{field_name}}">
        <label type="button" class="btn btn-default {{field_name}}_type_percent" data-option-name="type">
            <input type="radio" style="display: none;" name="team_{{field_name}}_type" checked data-value="percent"/>
            <svg class="icon icon-percent" viewBox="0 0 320 320">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-percent"></use>
            </svg>
        </label>
        <label type="button" class="btn btn-default {{field_name}}_type_star" data-option-name="type">
            <input type="radio" style="display: none;" name="team_{{field_name}}_type" data-value="star"/>
            <svg class="icon icon-star" viewBox="0 0 1024 1024">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-star-full"></use>
            </svg>
        </label>
    </div>
</div>