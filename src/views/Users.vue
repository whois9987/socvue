<template>
  <div>
    <v-btn @click="add.dialog = true" color="primary">{{ add.nameTitle }}</v-btn>
    <br />
    <br />
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">NO</th>
                  <th class="text-center">Nama</th>
                  <th class="text-center">email</th>
                  <th class="text-center">Password</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in users" :key="item.id">
                  <td class="text-center">{{ index+1 }}</td>
                  <td class="text-center">{{ item.nama }}</td>
                  <td class="text-center">{{ item.email }}</td>
                  <td class="text-center">{{ item.password }}</td>
                  <td class="text-center">
                    <v-btn @click="edit.fun.binding(item.id)" class="mx-1" fab dark small color="primary">
                      <v-icon dark>mdi-eyedropper</v-icon>
                    </v-btn>
                    <v-btn @click="del.fun(item.id)" class="mx-1" fab dark small color="red">
                      <v-icon dark>mdi-delete-variant</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar.self"
      color="primary"
      absolute
      right
      shaped
      top
    >
     {{snackbar.message}}
    </v-snackbar>    
    <!-- / create modal -->
    <v-dialog v-model="add.dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ add.nameTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="add.formData.nama"
                  label="Nama*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="add.formData.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="add.formData.password"
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="add.dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="add.fun">Save Data</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / create modal -->
    <!-- / edit modal -->
    <v-dialog v-model="edit.dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ edit.nameTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="edit.formData.nama"
                  label="Nama*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="edit.formData.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="edit.dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="edit.fun.update">Save Data</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
    <!-- / edit modal -->
  </div>
</template>

<script>
export default {
  name: "Users",
  sockets: {
    add_handler: function () {
      this.fectUsers();
      this.snackbar.message = 'New Data'
      this.snackbar.self = true
    },
    update_handler: function () {
      this.fectUsers();
      this.snackbar.message = 'New Update Data'
      this.snackbar.self = true
    },
    delete_handler: function () {
      this.fectUsers();
      this.snackbar.message = 'New Delete Data'
      this.snackbar.self = true
    },        
  },
  data() {
    return {
      snackbar: {
        self: false,
        message: ''
      },
      users: [],
      add: {
        nameTitle: "Add Users",
        dialog: false,
        formData: {
          nama: "",
          email: "",
          password: "",
        },
        fun: async () => {
          this.$http
            .post("/users", this.add.formData)
            .then(async () => {
              this.add.dialog = false;
              this.resetForm(this.add.formData);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      edit: {
        nameTitle: "Edit Users",
        dialog: false,
        formData: {
          id:"",
          nama: "",
          email: "",
        },
        fun: {
          binding: (async (self) => {
        this.$http
        .get(`/users/${self}`)
        .then(async (res) => {
        this.edit.formData.id = res.data.data[0].id
         this.edit.formData.nama = res.data.data[0].nama
         this.edit.formData.email = res.data.data[0].email
         this.edit.dialog = true
        })
        .catch((err) => {
          console.log(err);
        });            
          }),
          update: (() => {
          this.$http
            .put("/users", this.edit.formData)
            .then(async () => {
              this.edit.dialog = false;
              this.resetForm(this.edit.formData);
            })
            .catch((err) => {
              console.log(err);
            });            
            
          })          
        },
      },
      del:{
      fun: ((self) => {
          this.$http
            .delete("/users", {data:{id:self}})
            .then(async () => {

            })
            .catch((err) => {
              console.log(err);
            });
      })
      }
    };
  },
  created() {
    this.fectUsers();
  },
  methods: {
    fectUsers() {
      this.$http
        .get("/users")
        .then(async (res) => {
          this.users = await res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetForm(binding) {
      console.log(binding);
      Object.keys(binding).forEach(function (key) {
        binding[key] = "";
      });
    },
  },
};
</script>

<style>
</style>