<?php
    if($styles['panel_contacts_visible'] == '1' && ($employer->email || $employer->skype || $employer->phone)) {
        ?>
        <div class="contacts">
            <ul>
                <?php
                if (!empty($employer->email)) {
                    $email = esc_html($employer->email);
                    echo '<li><a href="mailto:' . $email . '" title="Write email">';
                    echo $email;
                    echo '</a></li>';
                }
                if (!empty($employer->skype)) {
                    $skype = esc_html($employer->skype);
                    echo '<li>Skype: ';
                    echo "<a href='skype:" . $skype . "?call' title='Skype' target='_blank'>";
                    echo $skype;
                    echo '</a></li>';
                }
                if (!empty($employer->phone)) {
                    $phone = esc_html($employer->phone);
                    echo '<li><a href="tel:' . $phone . '" title="Phone call">';
                    echo $phone;
                    echo '</a></li>';
                }
                ?>
            </ul>
        </div>
        <?php
    }