<div class="input-group form-group team-skills-settings {{field_name}}_settings" id="team-skills-settings" data-field-name="{{field_name}}">
    <div class="{{field_name}}_font_size model-field">
        <span class="field_label">Font settings</span>
        <input type="text" name="team_{{field_name}}_font_size" class="form-control" placeholder="14px">
    </div>
    <div class="{{field_name}}_text_color bootstrap-colorpicker model-field">
        <span class="input-group-addon color"><i></i></span>
        <input type="hidden"
               name="team_{{field_name}}_text_color"
               class="option-color"
               value=""
               class="form-control" />
    </div>
    <?php include 'parts/font_style.php'; ?>
    <?php include 'parts/text_transform.php'; ?>
    <?php include 'parts/align.php'; ?>


    <span class="tooltip-separator"></span>

    <div class="model-field {{field_name}}_size">
        <span class="field_label">Skill settings</span>
        <input type="text" name="team_{{field_name}}_size" class="form-control" placeholder="10px">
    </div>
    <div class="{{field_name}}_bar_color bootstrap-colorpicker model-field">
        <span class="input-group-addon color"><i></i></span>
        <input type="hidden"
               name="team_{{field_name}}_bar_color"
               class="option-color"
               value=""
               class="form-control" />
    </div>
    <?php include 'parts/skills_type.php'; ?>
    <?php include 'parts/top_margin.php'; ?>
</div>