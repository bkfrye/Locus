<div class="btn-group {{field_name}}_shape btn-group-photo-shape btn-group-radio model-field" data-field-name="{{field_name}}">
    <label type="button" class="btn btn-default active {{field_name}}_shape_square" data-option-name="shape">
        <input type="radio"
               style="display: none;"
               name="team_{{field_name}}_shape"
               class="option-photo-shape"
               checked
               data-value="square" />
        <svg viewBox="0 0 36 36">
            <use xlink:href="#icon-image-square" transform="translate(-248, -547)"></use>
        </svg>
    </label>
    <label type="button" class="btn btn-default {{field_name}}_shape_round" data-option-name="shape">
        <input type="radio"
               style="display: none;"
               name="team_{{field_name}}_shape"
               class="option-photo-shape"
               data-value="round"/>
        <svg viewBox="0 0 36 36">
            <use xlink:href="#icon-image-circle" transform="translate(-197, -547)"></use>
        </svg>
    </label>
</div>