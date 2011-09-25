<?php
$this->load->view(
  'common/assets',
  array(
    'page_title' => 'Welcome to FroSoCo!',
    'js' => 'main-home',
  )
);
?>

<div id="home">
  <div id="top">
    <div id="nav">
      <div class="wrapper">
        <ul>
          <li><a class="events" href="">
            <span class="sprite"></span>
            <span class="text">Events</span>
          </a></li>
          <li><a class="about" href="">
            <span class="sprite"></span>
            <span class="text">About</span>
          </a></li>
          <li><a class="login" href="">
            <span class="sprite"></span>
            <span class="text">Login</span>
          </a></li>
        </ul>
      </div>
    </div>

    <div id="top_content">
      <div id="logo">
        Freshman<br/>
        Sophomore<br/>
        College
      </div>

      <div id="slideshow">
<?php
          $this->load->helper('directory');

  $PHOTO_DIR = 'assets/img/home/slideshow/photos/';
  $PHOTO_PREFIX = base_url() . $PHOTO_DIR;
  $photos = directory_map($PHOTO_DIR, 1);

  echo '<ul class="slides">';
  foreach ($photos as $photo) {
    echo '<li>';
    echo '<img src="' . $PHOTO_PREFIX . $photo . '"/>';
    echo '</li>';
  }
  echo '</ul>';
  ?>

  <span class="arrow previous"></span>
  <span class="arrow next"></span>
      </div>
    </div>

    <div class="clear"></div>

  </div>

  <div id="main">
    <div id="events_upcoming" class="content">
      <div class="wrapper">
        <div class="section_label">
          Upcoming<br/>
          Events
        </div>
        <div class="section_content">
          <table>
            <tr>
              <td class="event_hover">
              </td>
              <td class="event_time">
                09.14 @ 12:00pm
              </td>
              <td class="event_title">
                BBQ at the Dean's
              </td>
            </tr>

            <tr>
              <td class="event_hover">
              </td>
              <td class="event_time">
                09.14 @ 12:00pm
              </td>
              <td class="event_title">
                BBQ at the Dean's hoiserjlfdsjkl fjsdkalfjkdsla fjskdlafjkdlsajf
                fjdsklajfkldas jfkldsajfklas dfjkl
              </td>
            </tr>

          </table>
        </div>

        <div id="calendar" class="section_content">
          <iframe
            src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23efefef&amp;src=frosoco.stanford%40gmail.com&amp;color=%23182C57&amp;ctz=America%2FLos_Angeles"
            style=" border-width:0 " width="580" height="500" frameborder="0"
            scrolling="no"></iframe>
        </div>
      </div>

      <div class="clear"></div>
    </div>

    <div id="about" class="content bg">
      <div class="wrapper">
        <div class="section_label">
          What is<br/>
          FroSoCo?
        </div>
        <div class="section_content">
          <p>
            The Freshman-Sophomore College provides the vibrant residential
            intellectual community of a small, elite, liberal-arts college while
            providing enhanced access to the academic resources of one of the
            world's premier research universities. The College consists of
            approximately 100 freshman and 60 sophomores living in two adjoining
            houses with rooms for freshmen and sophomores interspersed on all
            floors. Admission is by application only and once admitted students
            can opt to stay for their sophomore year. We aim to bring together
            the most talented students at Stanford and then help them achieve a
            balance of academic preparation, personal exploration, cultural
            enrichment, and self-reflection at the highest level. They emerge
            with the critical self-understanding needed for the life-long
            project
            of designing a meaningful life and are already connected to the
            resources at Stanford that can set them on the path towards being
            exceptional individuals and community leaders.
          </p>

          <p>
            Part of what helps us achieve these goals is a fun community of
            students that share their extraordinary abilities and help each
            other develop, flourish and enjoy life: at the College you will
            live, study, and play with like-minded individuals who are
            academically driven, excited about the arts, give back to their
            community, play Frisbee in the Quad, build a trebuchet to apply
            their knowledge of physics, travel around the Bay Area and beyond to
            visit museums, attend plays, sporting events, concerts,
            restaurants - all supported by the College and its extensive staff.
            Each house of the college has a senior staff or faculty couple, our
            College Directors, that live in attached residences; the College
            Dean lives across from the College. Along with the regular student
            staff, we have extra writing and subject tutors, a public speaking
            tutor, and a multimedia consultant. In addition to the wide range of
            workshops and tutorials provided by our staff, our sophomores lead
            mini-seminars on a diverse array of subjects exclusively for our
            residents. The College has the resources to continuously bring in
            distinguished professors, entrepreneurs, community leaders, and
            artists to meet with the students and have dinner with them at the
            Dean's residence.
          </p>

          <p>
            In this dynamic, energetic, and fun atmosphere you will gain the
            knowledge and skills, and the friends, mentors, advisors, and
            academic and professional relationships, you need to thrive at
            Stanford and beyond.
          </p>
        </div>
        <div class="clear"></div>
      </div>


    </div>

  </div>

  <!--  <div id="footer"></div>-->
</div>
