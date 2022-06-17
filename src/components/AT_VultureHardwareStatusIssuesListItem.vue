

<script setup>
import Label from "@/components/Label.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<script>
export default {
  props: {
    issue_obj: "",
  },
  data() {
    return{
      system_id_dictionary: {sonar_array: 'Sonar Array', dynamics: 'Dynamics', navigation: 'Navigation'},
      component_id_dictionary: {
        fwd_sonar: 'Forward Sonar',
        bwd_sonar: 'Rear Sonar',
        lft_sonar: 'Left-side Sonar',
        rgt_sonar: 'Right-side Sonar',
        gnd_sonar: 'Ground Sonar',
        primary_imu: 'IMU',
        primary_acc: 'Accelerometer',
        gps: 'GPS',
        magnetometer: 'Magnetometer',
        barometer: 'Barometer'
      },
      status_type_dictionary: {
        0: 'Offline',
        1: 'Faulty',
        2: 'Unknown'
      }
    }
  }
}
</script>

<template>
  <div class="issue_list_item_container">
    <Label id="issue_system_id_l" class="issue_x_l" v-text="system_id_dictionary[issue_obj.system_id]"></Label>
    <Label id="issue_part_id_l" class="issue_x_l" v-text="component_id_dictionary[issue_obj.component_id]"></Label>
    <Label id="issue_part_status_type_l" class="issue_x_l" v-text="status_type_dictionary[issue_obj.status_type]"></Label>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 800px) {
  .issue_list_item_container{
    position: relative;
    left: 0%;
    width: 100%;
    height: 24.855491329%;
    border-bottom: solid 1px #FF006B;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .issue_list_item_container:hover{
    background-color: #FF006B20;
  }
  .issue_x_l{
    font-size: 4.5vw;
    height: 50.744186047%;
    display: flex;
    align-items: center; 
    justify-content: start;
    border-right: solid 1px #FF006B;    
  }
  #issue_system_id_l{
    width: 31.269349845%;
    left: 0.92879257%;
  }
  #issue_part_id_l{
    width: 38.390092879%;
    left: 33.436532508%;
  }
  #issue_part_status_type_l{
    left: 73.06501548%;
    width: 26.93498452%;
    border: none;    
  }
}
</style>