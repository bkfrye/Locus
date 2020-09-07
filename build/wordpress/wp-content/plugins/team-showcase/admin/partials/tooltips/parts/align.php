<div class="btn-group {{field_name}}_align btn-group-align btn-group-radio model-field" data-field-name="{{field_name}}">
    <label type="button" class="btn btn-default active {{field_name}}_align_left" data-option-name="align">
        <input type="radio"
               style="display: none;"
               name="team_{{field_name}}_align"
               class="option-align"
               checked
               data-value="left" />
        <svg viewBox="0 0 36 36">
            <use xlink:href="#icon-align-left" transform="translate(10, 0)"></use>
        </svg>
    </label>
    <label type="button" class="btn btn-default {{field_name}}_align_center" data-option-name="align">
        <input type="radio"
               style="display: none;"
               name="team_{{field_name}}_align"
               class="option-align"
               data-value="center"/>
        <svg viewBox="0 0 36 36">
            <use xlink:href="#icon-align-center" transform="translate(-40, 0)"></use>
        </svg>
    </label>
    <label type="button" class="btn btn-default {{field_name}}_align_right" data-option-name="align">
        <input type="radio"
               style="display: none;"
               name="team_{{field_name}}_align"
               class="option-align"
               data-value="right"/>
        <svg viewBox="0 0 36 36">
            <use xlink:href="#icon-align-right" transform="translate(-90, 0)"></use>
        </svg>
    </label>
</div>